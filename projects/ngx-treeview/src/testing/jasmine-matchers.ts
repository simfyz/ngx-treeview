/* tslint:disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


import {ɵglobal as global} from '@angular/core';
import {ɵgetDOM as getDOM} from '@angular/platform-browser';
import {childNodesAsList, hasClass, hasStyle, isCommentNode} from './browser_utils';


/**
 * Jasmine matchers that check Angular specific conditions.
 */
export interface NgMatchers extends jasmine.Matchers<any> {
    /**
     * Invert the matchers.
     */
    not: NgMatchers;

    /**
     * Expect the value to be a `Promise`.
     *
     * ## Example
     *
     * {@example testing/ts/matchers.ts region='toBePromise'}
     */
    toBePromise(): boolean;

    /**
     * Expect the value to be an instance of a class.
     *
     * ## Example
     *
     * {@example testing/ts/matchers.ts region='toBeAnInstanceOf'}
     */
    toBeAnInstanceOf(expected: any): boolean;

    /**
     * Expect the element to have exactly the given text.
     *
     * ## Example
     *
     * {@example testing/ts/matchers.ts region='toHaveText'}
     */
    toHaveText(expected: string): boolean;

    toHaveTrimmedText(expected: string): boolean;

    /**
     * Expect the element to have the given CSS class.
     *
     * ## Example
     *
     * {@example testing/ts/matchers.ts region='toHaveCssClass'}
     */
    toHaveCssClass(expected: string): boolean;

    /**
     * Expect the element to have the given CSS styles.
     *
     * ## Example
     *
     * {@example testing/ts/matchers.ts region='toHaveCssStyle'}
     */
    toHaveCssStyle(expected: { [k: string]: string } | string): boolean;

    /**
     * Expect a class to implement the interface of the given class.
     *
     * ## Example
     *
     * {@example testing/ts/matchers.ts region='toImplement'}
     */
    toImplement(expected: any): boolean;

    /**
     * Expect an exception to contain the given error text.
     *
     * ## Example
     *
     * {@example testing/ts/matchers.ts region='toContainError'}
     */
    toContainError(expected: any): boolean;

    toHaveMap(expected: { [k: string]: any }): boolean;
}

const _global = <any> (typeof window === 'undefined' ? global : window);

/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
export const expect: (actual: any) => NgMatchers = <any> _global.expect;


// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
(Map as any).prototype['jasmineToString'] = function() {
    const m = this;
    if (!m) {
        return '' + m;
    }
    const res: any[] = [];
    m.forEach((v: any, k: any) => {
        res.push(`${k}:${v}`);
    });
    return `{ ${res.join(',')} }`;
};

_global.beforeEach(function() {
    jasmine.addMatchers({

        toBePromise: function() {
            return {
                compare: function(actual: any) {
                    const pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return {
                        pass: pass, get message() {
                            return 'Expected ' + actual + ' to be a promise';
                        }
                    };
                }
            };
        },

        toBeAnInstanceOf: function() {
            return {
                compare: function(actual: any, expectedClass: any) {
                    const pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },

        toHaveText: function() {
            return {
                compare: function(actual: any, expectedText: string) {
                    const actualText = elementText(actual);
                    return {
                        pass: actualText === expectedText,
                        get message() {
                            return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                        }
                    };
                }
            };
        },

        toHaveCssStyle: function() {
            return {
                compare: function(actual: any, styles: { [k: string]: string } | string) {
                    let allPassed: boolean;
                    if (typeof styles === 'string') {
                        allPassed = hasStyle(actual, styles);
                    } else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach(prop => {
                            allPassed = allPassed && hasStyle(actual, prop, styles[prop]);
                        });
                    }

                    return {
                        pass: allPassed,
                        get message() {
                            const expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${
                                expectedValueStr}"`;
                        }
                    };
                }
            };
        },

        toHaveTrimmedText: function() {
            return {
                compare: function(actual: any, expectedText: string) {
                    const actualText = elementText(actual).trim();
                    return {
                        pass: actualText === expectedText,
                        get message() {
                            return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                        }
                    };
                }
            };
        },


        toContainError: function() {
            return {
                compare: function(actual: any, expectedText: any) {
                    const errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        get message() {
                            return 'Expected ' + errorMessage + ' to contain ' + expectedText;
                        }
                    };
                }
            };
        },
        toHaveCssClass: function() {
            return {compare: buildError(false), negativeCompare: buildError(true)};

            function buildError(isNot: boolean) {
                return function(actual: any, className: string) {
                    return {
                        pass: hasClass(actual, className) == !isNot,
                        get message() {
                            return `Expected ${actual.outerHTML} ${
                                isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                };
            }
        },

        toImplement: function() {
            return {
                compare: function(actualObject: any, expectedInterface: any) {
                    const intProps = Object.keys(expectedInterface.prototype);

                    const missedMethods: any[] = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k]) {
                            missedMethods.push(k);
                        }
                    });

                    return {
                        pass: missedMethods.length === 0,
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(', ');
                        }
                    };
                }
            };
        },

        toHaveMap: function() {
            return {
                compare: function(actualObject: any, expected: { [k: string]: any }) {
                    let pass = true;
                    let failureName = '';
                    for (const propertyName in expected) {
                        if (!isMatchProperties(expected[propertyName], actualObject[propertyName])) {
                            pass = false;
                            failureName = propertyName;
                            break;
                        }
                    }
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + failureName + ' to match value';
                        }
                    };
                }
            };

            function isMatchProperties(src: any, dest: any): boolean {
                if (dest instanceof Object) {
                    for (const propertyName in dest) {
                        if (!isMatchProperties(src[propertyName], dest[propertyName])) {
                            return false;
                        }
                    }

                } else {
                    if (src !== dest) {
                        return false;
                    }
                }

                return true;
            }
        }
    });
});

function elementText(n: any): string {
    const hasNodes = (n: any) => {
        const children = n.childNodes;
        return children && children.length > 0;
    };

    if (n instanceof Array) {
        return n.map(elementText).join('');
    }

    if (isCommentNode(n)) {
        return '';
    }

    if (getDOM().isElementNode(n)) {
        const tagName = (n as Element).tagName;

        if (tagName === 'CONTENT') {
            return elementText(Array.prototype.slice.apply((<any> n).getDistributedNodes()));
        } else if (tagName === 'SLOT') {
            return elementText(Array.prototype.slice.apply((<any> n).assignedNodes()));
        }
    }

    if (hasShadowRoot(n)) {
        return elementText(childNodesAsList((<any> n).shadowRoot));
    }

    if (hasNodes(n)) {
        return elementText(childNodesAsList(n));
    }

    return (n as any).textContent;
}

function hasShadowRoot(node: any): boolean {
    return node.shadowRoot != null && node instanceof HTMLElement;
}
