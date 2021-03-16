// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller"


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller

     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.Details", {

            _onObjectMatch: function(oEvent){
                this.getView.bindElement({
                    path: "/" + window.dencodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"
                });
            },

            oInit: function () {

                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
            }

        });

    });