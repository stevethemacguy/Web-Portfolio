$(document).ready(function() 
{
    var body = $("body");
    var navItems = $("nav ul li");
    $(".toggleTheme").click(function()
    {
        body.toggleClass("dark");

        //Change logo to black or teal based on light/dark theme
        if(body.hasClass("dark"))
        {
            $(this).text("Light Theme");
        }
        else
        {
            $(this).text("Dark Theme");
        }
    });

    //This code only affects the mobile version of the site.
    $("header").click(function()
    {
        $(".mobile-logo").toggleClass("selected");
        $(".mobile-button").toggleClass("selected");
        if($(".mobile-logo").hasClass("selected"))
        {
            $(this).find("nav ul").show();
            navItems.css("background", "#000");
            $(this).find("nav ul li a").css("color","#40919b");
        }
        else
        {
            $(this).find("nav ul").hide();
        }
    });
    
    $("nav ul li").on("tap", function()
    {
        $(this).css("background", "#fff");
    });
});
