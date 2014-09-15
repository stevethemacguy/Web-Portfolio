$(document).ready(function() 
{
    var body = $("body");
    var mobileLogo = $(".mobile-logo");
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


    ////////////////// MOBILE JAVASCRIPT ONLY //////////////////
    //This code only affects the mobile version of the site.
    $("header").click(function()
    {
        //Exit if not mobile
        if($(window).width() >= 767)
            return;
        mobileLogo.toggleClass("selected");
        $(".mobile-button").toggleClass("selected");
        if(mobileLogo.hasClass("selected"))
        {
            $(this).find(".mobileNav ul").show();
            $(this).find(".mobileNav ul li").css("background", "#000");
            $(this).find(".mobileNav ul li a").css("color","#40919b");
        }
        else
        {
            $(this).find(".mobileNav ul").slideUp("fast");
        }
    });

    $(".mobileNav ul li").on("tap", function()
    {
        $(this).css("background", "#fff");
    });
});
