Ext.define('Simplex.view.game.GameDDProxy', {
	extend: 'Ext.dd.DDProxy',
	
	alignElWithMouse: function(el, iPageX, iPageY) {
        var oCoord = this.getTargetCoord(iPageX, iPageY),
            fly = el.dom ? el : Ext.fly(el, '_dd'),
            elSize = fly.getSize(),
            EL = Ext.Element,
            vpSize;

        if (!this.deltaSetXY) {
            vpSize = this.cachedViewportSize = { width: EL.getDocumentWidth(), height: EL.getDocumentHeight() };
            var aCoord = [
                oCoord.x,
                oCoord.y
            ];
            fly.setXY(aCoord);
            var newLeft = fly.getLeft(true);
            var newTop  = fly.getTop(true);
            this.deltaSetXY = [newLeft - oCoord.x, newTop - oCoord.y];
        } else {
            vpSize = this.cachedViewportSize;
            fly.setLeftTop(
                oCoord.x + this.deltaSetXY[0],
                oCoord.y + this.deltaSetXY[1]
            );
        }

        this.cachePosition(oCoord.x, oCoord.y);
        this.autoScroll(oCoord.x, oCoord.y, el.offsetHeight, el.offsetWidth);
        return oCoord;
    }
});