/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
// private - DD implementation for Panels
Ext.define('Ext.draw.SpriteDD', {
    extend: 'Ext.dd.DragSource',

    constructor : function(sprite, cfg){
        var me = this,
            el = sprite.el;
        me.sprite = sprite;
        me.el = el;
        me.dragData = {el: el, sprite: sprite};
        me.callParent([el, cfg]);
        me.sprite.setStyle('cursor', 'move');
    },

    showFrame: Ext.emptyFn,
    createFrame : Ext.emptyFn,

    getDragEl : function(e){
        return this.el;
    },
    
    getRegion: function() {
        var me = this,
            el = me.el,
            pos, x1, x2, y1, y2, t, r, b, l, bbox, sprite;
        
        sprite = me.sprite;
        bbox = sprite.getBBox();
        
        try {
            pos = Ext.core.Element.getXY(el);
        } catch (e) { }

        if (!pos) {
            return null;
        }

        x1 = pos[0];
        x2 = x1 + bbox.width;
        y1 = pos[1];
        y2 = y1 + bbox.height;
        
        return Ext.create('Ext.util.Region', y1, x2, y2, x1);
    },

    /*
      TODO(nico): Cumulative translations in VML are handled
      differently than in SVG. While in SVG we specify the translation
      relative to the original x, y position attributes, in VML the translation
      is a delta between the last position of the object (modified by the last
      translation) and the new one.
      
      In VML the translation alters the position
      of the object, we should change that or alter the SVG impl.
    */
     
    startDrag: function(x, y) {
        var me = this,
            attr = me.sprite.attr,
            trans = attr.translation;
        if (me.sprite.vml) {
            me.prevX = x + attr.x;
            me.prevY = y + attr.y;
        } else {
            me.prevX = x - trans.x;
            me.prevY = y - trans.y;
        }
    },

    onDrag: function(e) {
        var xy = e.getXY(),
            me = this,
            sprite = me.sprite,
            attr = sprite.attr;
        me.translateX = xy[0] - me.prevX;
        me.translateY = xy[1] - me.prevY;
        sprite.setAttributes({
            translate: {
                x: me.translateX,
                y: me.translateY
            }
        }, true);
        if (sprite.vml) {
            me.prevX = xy[0] + attr.x || 0;
            me.prevY = xy[1] + attr.y || 0;
        }
    }
});
