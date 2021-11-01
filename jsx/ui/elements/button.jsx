/*******************************************************************************
        TODO:           ---
		Name:           button
		Desc:           A button widget.
		Kind:           Widget.
		Created:        2108 (YYMM)
		Modified:       2108 (YYMM)
*******************************************************************************/

//@include "../blocks/widget.jsx"

_Button = function _Button(cfg){	
    _Widget.call(this, cfg, "button");

	// validate/ sanitize arguments before passing them to this;
	//=========================================================

	this.characters = 0;
	this.text = "";
	
	this.justify = "center";
	this.shortcutKey = "";
	this.enabled = 1;
	this.active = 0;
	this.visible = 1;
	this.helpTip = "";
	this.properties = {};
	this.indent = 0;
	this.alignment = "center";

	//========================
	this.onClick = cfg.onClick;
	
	this.eventListeners = [
		// [eventName:str, function handler(){...}:func, capturePhase:bool]
		// ...
	]
	this.onActivate = cfg.onActivate;
	this.onDeactivate = cfg.onDeactivate;
	this.onShortcutKey = cfg.onShortcutKey;

}; Object.extends(_Button, _Widget);