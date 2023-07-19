/**
 * Created by nicole.jung on 2023-06-15.
 */

({
    doSave : function(component, event, helper){
        component.set("v.showSpinner", true);

        var action = component.get("c.doSave");
        action.setParams({
//            "recordId" : component.get("v.recordId")
        });

        action.setCallback(this, function(response){
            var state = response.getState();
            console.log(state);

            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                var resultMsg = result.split('^||^');

                if(resultMsg[0] == 'success') {
                    helper.showToast(resultMsg[0], resultMsg[1]);

//                    $A.get("e.force:closeQuickAction").fire();
//                    $A.get("e.force:refreshView").fire();
                    var urlEvent = $A.get("e.force:navigateToURL");
                    urlEvent.setParams({
                         "url": "lightning/o/Transfer__c/list?filterName=Recent" ,
                         "isredirect": "true"
                    });

                    urlEvent.fire();

                }
                else {
                    console.log( ' result error >>>> ' , result );
                    helper.showToast(resultMsg[0], resultMsg[1]);

                }
            }
            else {
                var errors = response.getError();
                if(errors) {
                    if(errors[0] && errors[0].message) this.showToast("error", errors[0].message);
                } else {
                    this.showToast("error", "Unknown error");
                }
            }
            component.set("v.showSpinner", false);
        });
        $A.enqueueAction(action);
    },

    fireUrl : function(component, event, helper){
        console.log( 'fireUrl ::: ');
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
             "url": "lightning/o/Transfer__c/list?filterName=Recent" ,
             "isredirect": "true"
        });

        urlEvent.fire();
    },



    showToast : function(type, message) {
        var evt = $A.get("e.force:showToast");
        evt.setParams({
            key     : "info_alt",
            type    : type,
            message : message
        });
        evt.fire();
    },


    // Null , Undefined , '' 체크
    isNullCheck : function(value){
        if(value == null || value == undefined || value == ""){
            return true;
        }
        else{
            return false;
        }
    },
});
