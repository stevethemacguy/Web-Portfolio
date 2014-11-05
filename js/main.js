$(document).ready(function()
{
    //Resizes the main background image to fill the viewable area of the window.
    function resizeBackground()
    {
        var viewportHeight = $(window).height();
        //Optionally account for the header height to add a border to the bottom of the screen.
        /*var headerHeight = $('header').outerHeight(false);
        viewportHeight = viewportHeight - headerHeight; //The current viewable area of the viewport window.*/
        $("#mainImage").css('height', viewportHeight);
    }

    //Resize the background when the page first loads
    resizeBackground();

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
        }, 600,"easeOutCubic");
    });

    //Scroll to Anchor (Mobile)
    $(".mobileNav ul li").on("tap",function(event){
        event.preventDefault();
        $(this).addClass("selected");
        $(".mobileNav ul").slideUp("fast");
        var anchor = $(this).find("a").attr("href");
        //Normal div offset minus the height of the header, since it's fixed.
        var sectionTop = $(anchor).offset().top - $("header").outerHeight();
        $('html, body').animate({
            scrollTop: sectionTop
        }, 400);
    });

    ////////////////// MOBILE JAVASCRIPT ONLY //////////////////
    //This code only affects the mobile version of the site.
    $("header").on("tap", function() {
        //Exit if not mobile
        if ($(window).width() >= 767) {
            return;
        }
        $(this).removeClass("selected");
        mobileLogo.toggleClass("selected");
        $(".mobile-button").toggleClass("selected");

        if (mobileLogo.hasClass("selected")) {
            $(this).find(".mobileNav ul").show();
            $(".mobileNav ul li").removeClass("selected");
        }
        else {
            $(this).find(".mobileNav ul").slideUp("fast");
        }
    });

    //Enable parallax effects
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0
    });

    //These four logos animate at the same time, so cache the jquery objects
    var flyInIcons = $("#jiraLogo, #xamarinLogo, #phpLogo, #gitLogo");

    //Flag is true when animated logos are now visible
    var hasRevealed = false;

    //Animate logos from left to right (and vice versa) as the user scrolls
    $(window).scroll(function(){
        if (hasRevealed)
            return;
        var scrollpos = $(this).scrollTop();
        if (scrollpos >= 630 ) {
            flyInIcons.addClass("reveal");
        }
    });

    //Re-size the background when the browser is resized.
    $(window).resize(function() {
        resizeBackground();
    });
});
