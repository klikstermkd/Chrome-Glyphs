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
    var cont = document.getElementById("container");

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
        chrome.tabs.sendRequest(tab.id, {glyph: glyph});
    });
}

generate(glyphs);