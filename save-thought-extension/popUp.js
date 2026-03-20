document.addEventListener("DOMContentLoaded", () => {

  // ✅ Load selected text
  chrome.storage.local.get(
    ['selectedText','pageTitle','pageUrl'],
    (data)=>{
      document.getElementById('selectedText').value = data.selectedText || '';
    }
  );

  // ✅ Toggle logic
  const createNew = document.getElementById('createNew');
  const existingBtn = document.getElementById('existing');
  const newSection = document.querySelector('.newSection');
  const oldSection = document.querySelector('.oldSection');

  oldSection.classList.add('hidden');

  createNew.addEventListener('click', () => {
    createNew.classList.add('active');
    existingBtn.classList.remove('active');
    newSection.classList.remove('hidden');
    oldSection.classList.add('hidden');
  });

  existingBtn.addEventListener('click', () => {
    existingBtn.classList.add('active');
    createNew.classList.remove('active');
    newSection.classList.add('hidden');
    oldSection.classList.remove('hidden');
  });

  // ✅ Fetch existing notes
  async function fetchNotes(){
    try{
      const res = await fetch("http://localhost:8000/api/notes");
      const data = await res.json();

      console.log("Fetched notes:", data); // DEBUG

      const select = document.getElementById('existingNotes');

      data.forEach(note => {
        const option = document.createElement('option');
        option.value = note._id;
        option.textContent = note.title;
        select.appendChild(option);
      });

    } catch(e){
      console.error("Failed to fetch notes", e);
    }
  }

  fetchNotes();

  // ✅ Save button
  document.getElementById('saveButton').addEventListener('click', async () => {

    const selectedText = document.getElementById('selectedText');
    const title = document.getElementById('title').value;
    const note = document.getElementById('noteC');
    const tags = document.getElementById('tags').value
      .split(",")
      .map(tag => tag.trim());

    const noteId = document.getElementById('existingNotes').value;
    const iscreate = document.getElementById('createNew').classList.contains('active');

    try {

      if (iscreate) {
        await fetch("http://localhost:8000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            tags,
            selectedText: selectedText.value,
            note: note.value,
            pageTitle: document.title,
            pageUrl: window.location.href
          })
        });

      } else {
        await fetch(`http://localhost:8000/api/notes/${noteId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedText: selectedText.value,
            note: note.value,
            pageTitle: document.title,
            pageUrl: window.location.href
          })
        });
      }

      alert("Saved!");
      window.close();

    } catch (err) {
      console.error(err);
    }
  });

});




