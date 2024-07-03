
export function copyToClipBoard() {
    // const copyText = document.getElementById("jsonResult");
    //
    // // Select the text field
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    let text = copyTextFromInput("jsonResult")

    // Copy the text inside the text field
    navigator.clipboard.writeText(text);

    console.log('text: ', text)

    // Alert the copied text
    alert(text);

    // TODO:  There may be some bugs around closing the alert (...document not focused...).  Need to test without dev tools open for sure.

    // ------------------------------

    // clipboard.writeText(clippy_button.href).then(function(x) {
    //     alert("Link copied to clipboard: " + clippy_button.href);
    //   });

}

export function copyTextFromInput( id ) {
    let copyText = document.getElementById(id);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    return copyText.value;
}

