//get selected text value
document.addEventListener('DOMContentLoaded',()=>{
    chrome.storage.local.get(
        ['selectedText','pageTitle','pageUrl'],
        (data)=>{
            document.getElementById('selectedText').value=data.selectedText || '';
        }
    )
});
//send info to backend
document.getElementById('saveButton').addEventListener('click', async () => {
    const selectedText = document.getElementById('selectedText');
    const title = document.getElementById('title').value;
    const note = document.getElementById('noteC');
    const tags = document.getElementById('tags').value
        .split(",")
        .map(tag => tag.trim());
    chrome.storage.local.get(
        ['pageTitle', 'pageUrl'],
        async (data) => {
            await fetch('http://localhost:8000/api/notes', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title: title || data.pageTitle || "Untitled",
                    tags,
                    selectedText: selectedText.value,
                    note: note.value,
                    pageTitle: data.pageTitle,
                    pageUrl: data.pageUrl
                })
            });
            document.getElementById('selectedText').value = '';
            document.getElementById('noteC').value = '';
            document.getElementById('tags').value = '';
            document.getElementById('title').value = '';
            chrome.storage.local.remove(['selectedText', 'pageTitle', 'pageUrl']);
            window.close();
        }
    );
});
//toggle tags

const createNew=document.getElementById('createNew');
const existingNotes=document.getElementById('existing');
const newSection=document.querySelector('.newSection');
const oldSection=document.querySelector('.oldSection');
 oldSection.classList.add('hidden');
createNew.addEventListener('click',()=>{
    createNew.classList.add('active');
    existingNotes.classList.remove('active');
    newSection.classList.remove('hidden');
    oldSection.classList.add('hidden');
});
existingNotes.addEventListener('click',()=>{
    existingNotes.classList.add('active');
    createNew.classList.remove('active');
    newSection.classList.add('hidden');
    oldSection.classList.remove('hidden');
});

//create note option
async function fetchNotes(){
    try{
        const res =await fetch("http://localhost:8000/api/notes");
        const data=await res.json();
        const note=document.getElementById('existingNotes');
        data.forEach(notes=>{
            const option=document.createElement('option');
            option.value=notes._id;
            option.textContent=notes.title;
            note.appendChild(option);
        })

    }catch(e){
        console.error("Failed to fetch notes",e);
    }
}

document.addEventListener("DOMContentLoaded", fetchNotes);
