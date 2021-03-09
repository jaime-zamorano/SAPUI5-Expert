// @ts-nocheck

sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.util.MockServer"} MockServer
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.base.util.UriParameters} UriParameters
     * @param {typeof sap.base.Log} Log
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict";

        var oMockServer,
            _sAppPath = "logaligroup/SAPUI5/",
            _sJsonFilesPath = _sAppPath + "localservice/mockdata";


        var oMockServerInterFace = {
            /**
             * Initializes the mock server Asynchronously
             * @protected
             * @param {object} oOptionsParameters 
             * @returns{Promise} a promise that is resolved when the mock server has been started 
             */
            Init: function (oOptionsParameters) {
                var oOption = oOptionsParameters || {};
                return new Promise(function (fnResolver, fnReject) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        var oJsonFileUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/northwind.svc");//posible error
                        var oMetaDataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();


                        if (!oMockServer) {

                            oMockServer = new MockServer({ rootUri: sMockServerUrl });

                        } else {
                            oMockServer.stop();

                        }

                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOption.delay || oUriParameters.get("serverDelay") || 500)
                        });

                        oMockServer.simulate(oMetaDataUrl, { sMockdataBaseUrl: oJsonFileUrl, bGenerateMissingMockData: true });

                        var aRequests = oMockServer.getRequests();

                        var fnResponse = function (iErrCode, sMessage, aRequest) {
                            aRequest.response = function (oXhr) {
                                oXhr.response(iErrCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                            };
                        };


                        if (oOption.metadataError || oUriParameters.get("metadataError")) {

                            aRequest.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexof("$metadata") < -1) {
                                    fnResponse(500, "meta data Error", aEntry);
                                }
                            });
                        };


                        var sErrorParam = oOption.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam === "BadRequest" ? 400 : 500;


                        if (sErrorParam) {
                            aRequest.forEach(function (aEntry) {

                                fnResponse(iErrorCode, sErrorParam, aEntry);

                            });
                        };


                        oMockServer.setRequests(aRequests);
                        oMockServer.start();

                        Log.info("Running the app with mock data");
                        fnResolver();

                    });

                    oManifestModel.attachRequestFailed(function(){
                        var sError = "Fail to load the applicatrion manifest";
                        Log.error(sError); 
                        fnReject(new Error(sError));
                    });

                });

            }
        };

        return oMockServerInterFace;
    });