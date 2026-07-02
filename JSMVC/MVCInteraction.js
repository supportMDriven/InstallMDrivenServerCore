var _this = this;


function SubmitAction(event, target, theaction, areYouSureQuestion) {
    if (areYouSureQuestion === void 0) { areYouSureQuestion = ""; }
    if (event !== undefined)
        event.stopPropagation();
    if (areYouSureQuestion !== undefined && areYouSureQuestion != '') {
        var answer = window.confirm(areYouSureQuestion);
        if (!answer)
            return;
    }
    Cookies.set("scroll", $(document).scrollTop(), 1);

    var theform = $(target).closest('form');
    $(theform).attr('action', theaction); // a bit unclear why I needed the '/'  at one time - but that was wrong when being in subdir,
    theform.submit();
};

function NavigateTo(event, target, url, areYouSureQuestion) {
    if (areYouSureQuestion === void 0) { areYouSureQuestion = ""; }
    if (event !== undefined)
        event.stopPropagation();
    if (areYouSureQuestion !== undefined && areYouSureQuestion != '') {
        var answer = window.confirm(areYouSureQuestion);
        if (!answer)
            return;
    }
    var theform = $(target).closest('form');
    window.location.href = url;
};
var dblClickTimeOut;
// Toggle row check-box
function ToggleRow(event, target) {
    if (event !== undefined) {
        event.stopPropagation();
        if (event.target.type == 'checkbox')
            return; // if the automated click below bubbles up and calls again
    }
    if (event.detail > 1) {
        clearTimeout(dblClickTimeOut);
        return; // skip if double
    }
    dblClickTimeOut = setTimeout(() => {
        //debugger;
        var cb = $(".selector", target);
        cb.prop("checked", !cb.prop("checked"));
        Cookies.set("scroll", $(document).scrollTop(), 1);
        var theform = $(target).closest('form');
        theform.submit();

    }, 200);
};
// Toggle row check-box
function SetCurrentRow(event, target) {
    if (event !== undefined) {
        event.stopPropagation();
        if (event.target.type == 'checkbox')
            return; // if the automated click below bubbles up and calls again
    }
    $(".selector", target.parentElement).removeAttr('checked'); // Unselect all checked in the list
    //$(".vmTableRow", target.parentElement).removeClass("vmCurrentRow"); // Remove the current visual style
    $(".selector", target).click(); // Click the hidden checkbox
    Cookies.set("scroll", $(document).scrollTop(), 1);
    var theform = $(target).closest('form');
    theform.submit();
};


// If cookie is set, scroll to the position saved in the cookie.
if (Cookies.get("scroll") !== null) {
    $(document).scrollTop(parseInt(Cookies.get("scroll")));
    Cookies.remove("scroll");
};



