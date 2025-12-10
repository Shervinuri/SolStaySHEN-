import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  containerId: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol, containerId }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    
    const initWidget = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          "width": "100%",
          "height": 450,
          "symbol": symbol,
          "interval": "1",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#131722",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "container_id": containerId,
          "backgroundColor": "#131722",
          "gridLineColor": "#2a2e39"
        });
        isMounted.current = true;
      } else {
        setTimeout(initWidget, 500);
      }
    };

    initWidget();
  }, [symbol, containerId]);

  return (
    <div className="w-full h-[450px] border border-tv-border rounded overflow-hidden bg-tv-bg relative">
      <div id={containerId} className="w-full h-full" />
    </div>
  );
};

export default TradingViewWidget;