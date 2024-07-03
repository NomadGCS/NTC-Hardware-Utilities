
export function copyToClipBoard() {
    // const copyText = document.getElementById("jsonResult");
    //
    // // Select the text field
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    let text = copyTextFromInput("jsonResult")

    // Copy the text inside the text field
    navigator.clipboard.writeText(text);

    // Alert the copied text
    alert(text);
}

export function copyTextFromInput( id ) {
    let copyText = document.getElementById(id);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    return copyText.value;
}

