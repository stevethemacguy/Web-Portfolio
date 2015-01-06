$(document).ready(function() {

    //Cache jQuery references
    var body = $("body");
    var mobileLogo = $("#mobile-logo");

    //Resizes the main background image to fill the viewable area of the window.
    function resizeBackground() {
        var viewportHeight = $(window).height();
        //Optionally account for the header height to add a border to the bottom of the screen.
        /*var headerHeight = $('header').outerHeight(false);
        viewportHeight = viewportHeight - headerHeight; //The current viewable area of the viewport window.*/
        $("#landingArea").css('height', viewportHeight);
    }

    //Resize the background when the page first loads
    resizeBackground();

    //Re-size the background when the browser is resized.
    $(window).resize(function() {
        resizeBackground();
    });

    $(".toggleTheme").click(function() {
        body.toggleClass("dark");

        //Change logo to black or teal based on light/dark theme
        if (body.hasClass("dark")) {
            $(this).text("Light Theme");
        }
        else {
            $(this).text("Dark Theme");
        }
    });

    //Currently not used to encouraging scrolling instead of clicking since it's smoother
    //Arrow Scroll to Project Section
    /*$(".downArrow").click(function(event) {
        event.preventDefault();
        //Normal div offset minus the height of the header, since it's fixed.
        var sectionTop = $("#projects").offset().top - $("header").outerHeight();
        $('html, body').animate({
            scrollTop: sectionTop
        }, 7000, "linear");
    });*/

    //Scroll to Anchor (Desktop)
    $(".navContainer").find("a").click(function(event) {
        event.preventDefault();
        //Normal div offset minus the height of the header, since it's fixed.
        var sectionTop = $(this.hash).offset().top - $("header").outerHeight();
        $('html, body').animate({
            scrollTop: sectionTop
        }, 600, "easeOutCubic");
    });

    //Scroll to Anchor (Mobile)
    $(".mobileNav ul li").on("tap", function(event) {
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

    //Cache a few jQuery objects
    var sliderDiv = $("#sliderContainer");
    var thumbnails = $(".projectThumbnail");

    thumbnails.click(function() {
        sliderDiv.removeClass(); //remove all classes
        thumbnails.removeClass("active"); //Make other thumbnails inactive
        $(this).addClass("active"); //Make the thumbnail active

        //Use the index position of the thumbnail element to determine which class to add
        var thumbIndex = thumbnails.index(this);
        sliderDiv.addClass("trans" + thumbIndex);
    });

    $(".more").click(function() {
        var quoteGroup = $(".quoteGroup");
        quoteGroup.toggleClass("hide"); //Sets opacity to 0, but does not remove the element
        quoteGroup.find($(".more")).toggleClass("hide"); //Actually remove the element
        quoteGroup.find($(".quoteSource")).toggleClass("hide"); //Actually remove the element
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
    ////////////////// END MOBILE-ONLY SECTION //////////////////

    //Enable parallax effects
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0
    });

    //These four logos animate at the same time, so cache the jquery objects
    var flyInIcons = $("#jiraLogo, #xamarinLogo, #phpLogo, #gitLogo");

    //When the any "fly-in" logo is in view, show all fly-in icons
    $("#xamarinLogo").on('inview', function(event, offscreen) {
        if (offscreen) {
            //no longer visible
        }
        else {
            flyInIcons.addClass("reveal");
            $(this).unbind('inview'); //Elements are now visible, so remove the binding
        }
    });

    //When the htmlLogo logo is in view, the user has started scrolling, so hide the arrow
    var scrollArrow = $(".arrowContainer");
    $(window).scroll(function() {
        if ($(this).scrollTop() > 88) {
            if (scrollArrow.css("opacity") < 1) {
                return; //Only call animate at the edge cases
            }
            scrollArrow.stop().animate({opacity: 0}, 500);
        }
        else {
            if (scrollArrow.css("opacity") > 0) {
                return; //Only call animate at the edge cases
            }
            scrollArrow.stop().animate({opacity: 1}, 500);
        }
    });
});
