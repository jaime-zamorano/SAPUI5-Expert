// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller"


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller

     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.App", {

            oInit: function () {
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

            },

            onOpenDialogHeader: function () {
                this.getOwnerComponent().openHelloDialog();
            }

        });

    });