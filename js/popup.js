/*
 * Chrome Glyphs
 *
 * This file contains Chrome Glyphs popup functions 
 *
 * @package		Chrome Glyphs
 * @category	        Popup
 * @author		Trajche Petrov & Aleksandar Jovanov
 * @link		https://github.com/klikstermkd/Chrome-Glyphs
*/

/*
 * -----------------------------------------------------------------------------
 * Defining main popup variables
 * -----------------------------------------------------------------------------
*/
    var debug = true,
        cont = document.getElementById("container"),
        copied = document.getElementById("copied"),
        clipboard = document.getElementById('clipboard'),
        dbGlyphs = JSON.parse(localStorage.getItem("glyphs"));

/*
 * -----------------------------------------------------------------------------
 * Generate glyphs
 * -----------------------------------------------------------------------------
*/
function generate(glyphs)
{
    for(cat in glyphs)
    {
        var ul = document.createElement("ul");
            ul.setAttribute('id',cat); //set id of ul element
            
        for(item in glyphs[cat])
        {
            li = document.createElement("li");
            li.innerHTML = glyphs[cat][item];
            
            li.addEventListener("click", function() // add event listener
            {
                send_glyph(this.innerHTML);
            });
            
            ul.appendChild(li);          
        }
        cont.appendChild(ul);           
    }
}

/*
 * -----------------------------------------------------------------------------
 * Insert choosen glyph into selected input element or if not copy to clipboard
 * -----------------------------------------------------------------------------
*/
function send_glyph(glyph)
{
    chrome.tabs.getSelected(null, function(tab)
    {
        chrome.tabs.sendRequest(tab.id, {glyph: glyph},function(response)
        {
            if(response.action == 'copy')
            {
                copy(response.glyph);
            }
        });
    });
}

/*
 * -----------------------------------------------------------------------------
 * Copy function - copyies choosen glyph if no input element is selected
 * -----------------------------------------------------------------------------
*/
function copy(glyph)
{
    clipboard.value = glyph;					
    clipboard.focus();
    clipboard.select();
    document.execCommand('Copy');
    copied.style.display = "block";
    timeout = setTimeout(function(){copied.style.display = "none";},3000)
}

/*
 * -----------------------------------------------------------------------------
 * Load main functions & initialize localstorage glyphs
 * -----------------------------------------------------------------------------
*/
(function()
{
    if(dbGlyphs == null || dbGlyphs === undefined || debug)
    {
        localStorage.setItem("glyphs", JSON.stringify(glyphs));
	dbGlyphs = JSON.parse(localStorage.getItem("glyphs"));
    }
    
    generate(dbGlyphs); //generate glyphs emelements
})();