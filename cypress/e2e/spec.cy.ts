describe('workspace-project App', () => {
    it('should display welcome message', () => {
        cy.visit('/');

        expect(cy.title()).eq('angular-ngx-treeview app is running!');
    });


});
