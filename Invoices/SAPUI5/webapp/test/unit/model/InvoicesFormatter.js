//@ts-nocheck
/* eslint-disable no-undef */

sap.ui.define([
    "logaligroup/SAPUI5/model/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */
    function (InvoicesFormatter, ResourceModel) {
        QUnit.module("Qnvoices Status", {

            beforeEach: function () {
                this._oResourceModel = new ResourceModel({
                    bundleUrl: sap.ui.require.toUrl("logaligroup/SAPUI5") + "/i18n/i18n.properties"
                });
            },

            afterEach: function () {

                this._oResourceModel.destroy();
            }

        });


        QUnit.test("Should return the voices status", function (assert) {

            let oModel = this.stub();
            oModel.withArgs("i18n").returns(this._oResourceModel);

            let oViewStub = {
                getModel: oModel
            };

            let oControllerStub = {
                getView: this.stub().returns(oViewStub);
            };

            let fnIsolatedFormatter = InvoicesFormatter.invoicesStatus.bind(oControllerStub);

            //Assert
            assert.strictEqual(fnIsolatedFormatter("A"), "New", "The Invoices Status for A is Correct");
            assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "The Invoices Status for B is Correct");
            assert.strictEqual(fnIsolatedFormatter("C"), "Done", "The Invoices Status for C is Correct");
        });

    });