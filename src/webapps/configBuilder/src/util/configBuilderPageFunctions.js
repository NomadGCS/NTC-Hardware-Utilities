
export async function copyToClipBoard() {
    let text = copyTextFromInput("jsonResult")

    // Copy the text inside the text field
    await parent.navigator.clipboard.writeText(text);
    console.log('text: ', text)

    // Alert the copied text
    alert('JSON copied to clipboard');    

}

export function copyTextFromInput( id ) {
    let copyText = document.getElementById(id);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    return copyText.value;
}

