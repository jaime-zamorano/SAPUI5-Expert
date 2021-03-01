// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.HelloPanel", {

            oInit: function () {


            },

            onShowHello: function () {
                //read text from i18 n model 
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                //read text from i18 n PROPERTIES
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);

                MessageToast.show(sMsg);
            },

            onOpenDialog: function () {
               this.getOwnerComponent().openHelloDialog();
            }





        });

    });