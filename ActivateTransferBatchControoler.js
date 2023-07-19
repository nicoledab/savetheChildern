/**
 * Created by nicole.jung on 2023-06-15.
 */

({
    fnInit : function(component, event, helper){
        console.log('Activate TransferBatch ');

    },

    fnCancel : function(component, event, helper){
         console.log('Activate  fnCancel ');

//        $A.get("e.force:closeQuickAction").fire();
        helper.fireUrl(component, event, helper);
    },

    fnSave : function(component, event, helper){
        helper.doSave(component, event, helper);
    },
});
