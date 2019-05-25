# Swipe2Nav
Firefox Add-on to enable two-finger left and right gestures to navigate browser history

**Early beta testing**

## Why?

I found out that by default on Windows 10 (at least) Firefox (at least) does not support two finger swip to right or left to navigate through browser history. This led me to create my own add-on for this purpose.

**Searching for solution**

I found a solution for this problem from Mozilla's Firefox Addon Store page[0], but it was unusable. The implementation seemed to work, maybe even better than expected it had fancy animations (like the default behaviour on OSX), but it requires "Access your data for all websites" permission which as some reviews had pointed out was way excessive. 

Situation did not get any better when I tired to check who had uploaded the add-on to the Store. It was uploaded by "Firefox user 13430128". There was however link to a github[1] which hosted the project. In that repository's manifest it only requires `storage` permission, but what is more confusing is that both of these claim to be of the same version 1.2.7. and the github repo linked to the store page explicitly in its README

I reviewed the implementation and there was nothing malicious about it (at least on the Github), but since there was no way to contant the author to update the Firefox Store, the code base wasn't in terribly good condition, and there was unnecessary bloat like the animations (which is why it requires storage permissions btw, to store boolean if you wanted them or not) I decided to reimplement the addon. 

The original was released under MIT license, so I could have forked it, but I wanted to make the logic simpler which made rewrite a better option than simple refactoring.


 - [0] https://addons.mozilla.org/en-US/firefox/addon/touchpadswipelikemac/
 - [1] https://github.com/koseduhemak/touchpadswipe



