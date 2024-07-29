
export async function copyToClipBoard() {
    let text = copyTextFromInput("jsonResult")

    // Copy the text inside the text field
    await parent.navigator.clipboard.writeText(text);
    console.log('text: ', text)


    // ELECTRON NOTES 
    // Since moving to electron, if showing an Alert before or after trying to use clipboard functions, an error will get thrown.  It appears 
    // that the document loses focus (in Electron only) when an Alert is displayed).

    // Alert the copied text
    //alert('JSON copied to clipboard');    // this causes it to crash in Electron....
}

export function copyTextFromInput( id ) {
    let copyText = document.getElementById(id);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    return copyText.value;
}

