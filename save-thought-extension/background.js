// right-click :save

    chrome.contextMenus.removeAll(()=>{
        chrome.contextMenus.create({
        id:"saveThought",
        title:"save as thought",
        contexts:["selection"]

    });
    })

chrome.contextMenus.onClicked.addListener((info,tab)=>{
    if(info.menuItemId === "saveThought"){
        chrome.storage.local.set({
            selectedText:info.selectionText,
            pageTitle:tab.title,
            pageUrl:tab.url
        },()=>{
            chrome.windows.create({
                url:"popUp.html",
                type:"popup",
                width:400,
                height:500
            });

        });
    }

});
console.log("Background loaded");
