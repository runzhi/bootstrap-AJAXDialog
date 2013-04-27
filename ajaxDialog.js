/*
 * A dialog can show data AJAX, with two buttons one confirm one cancel
 *requestUrl, dialog will send a ajax get to fetch data to display
 *target, a call back function, or a url to submit the form. will invoked when confirm button is clicked
 */

var efpDialog = function(requestUrl, target) {

    var dialog = ''+
    '        <div id="efpModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="efpModalLabel" aria-hidden="true">' +
    '            <form action="" method="post">' +
    '                <div class="modal-header">' +
    '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">' +
    '                        x' +
    '                    </button>' +
    '                    <h1 id="efpModalLabel">Loading</h1>' +
    '                </div>' +
    '                <div class="modal-body">' +
    '                    <p><img src="/efp/images/loader.gif" alt="Loading" >' +
    '                    </p>' +
    '                </div>' +
    '                <div class="modal-footer">' +
    '                    <button class="btn" data-dismiss="modal" aria-hidden="true">' +
    '                        Close' +
    '                    </button>' +
    '                    <button id="dialog_confirm" type="button" class="btn btn-primary disabled" disabled="disabled">' +
    '                        Save' +
    '                    </button>' +
    '                </div>' +
    '            </form>' +
    '        </div>';
    
    if($('#efpModal').size()!=0){
        $('#efpModal').remove();
    }
    $("body").append(dialog);
    
    $('#efpModal').modal({
        "backdrop":"static",
        "keyboard": false,
    });
    
    var disableConfirmButton = function(){
        $("#efpModal").find("#dialog_confirm").addClass("disabled").attr("disabled", "disabled");
    }
    
    var enableConfirmButton = function(){
        $("#efpModal").find("#dialog_confirm").removeClass("disabled").removeAttr("disabled");
    }

    if ( typeof (target) == "string") {
        $('#efpModal').find("form").attr("action", target);
        $("#efpModal").find("#dialog_confirm").click(function() {
            try{
                if(!$(this.form).valid()){
                    return;
                }
                
            }catch(e){}
            this.form.submit();
        });

    } else if ( typeof (target) == "function") {
        $("#efpModal").find("#dialog_confirm").click(function() {
            target.apply(this);
            return false;
        });
    }
    $.get(requestUrl, function(data) {
        $data = $($.trim(data));
        $("#efpModal").find("#efpModalLabel").html($data.find("header").html());
        $("#efpModal").find(".modal-body").html($data.find("content").html());
        $("#efpModal").find("#dialog_confirm").html($data.find("confirm_button_text").html());
        enableConfirmButton();
        eval($data.find("script").html());
        try{
            $('#efpModal').find("form").validate();
        }catch(e){}
    });
}
