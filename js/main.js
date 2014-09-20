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

    //Scroll to Anchor (Desktop)
    $(".navContainer").find("a").click(function(event){
        event.preventDefault();
        //Normal div offset minus the height of the header, since it's fixed.
        var sectionTop = $(this.hash).offset().top - $("header").outerHeight();
        $('html, body').animate({
            scrollTop: sectionTop
        }, 180);
    });

    //Scroll to Anchor (Mobile)
    $(".mobileNav ul li").on("tap",function(){
        $(this).css("background", "#fff");
        $(".mobileNav ul").slideUp("fast");
        var anchor = $(this).find("a").attr("href");
        //Normal div offset minus the height of the header, since it's fixed.
        var sectionTop = $(anchor).offset().top - $("header").outerHeight();
        $('html, body').animate({
            scrollTop: sectionTop
        }, 180);

    });

    ////////////////// MOBILE JAVASCRIPT ONLY //////////////////
    //This code only affects the mobile version of the site.
    $("header").on("tap", function()
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
});
