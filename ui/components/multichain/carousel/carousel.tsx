import React, { useState, useEffect, useContext } from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { Box, BoxProps } from '../../component-library';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../shared/constants/metametrics';

///: BEGIN:ONLY_INCLUDE_IF(solana)
import { getSelectedAccount, getUseExternalServices } from '../../../selectors';
///: END:ONLY_INCLUDE_IF

const Carousel = React.forwardRef(({
  slides = [],
  isLoading = false,
  onClose,
  onClick,
  onRenderSlides,
}, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const t = useI18nContext();
    const trackEvent = useContext(MetaMetricsContext);
    const externalServicesEnabled = !!useSelector(getUseExternalServices);

    ///: BEGIN:ONLY_INCLUDE_IF(solana)
    const selectedAccountType = (useSelector(getSelectedAccount))?.type;
    ///: END:ONLY_INCLUDE_IF

    const visibleSlides =
      slides
        .filter(slide => !(
          (slide.id === SOLANA_SLIDE.id && selectedAccountType === SolAccountType.DataAccount) ||
          (slide.id === BASIC_FUNCTIONALITY_SLIDE.id && externalServicesEnabled)
        ))
        .sort((a,b) =>
          a.priorityPlacement !== b.priorityPlacement ? a.priorityPlacement - b.priorityPlacement : null
        )
        .slice(0, MAX_SLIDES);

      // Prioritize contentful slides and solana slide if applicable
      visibleSlides.sort((a,b) => {
        if(a.undismissable !== b.undismissable) return a.undismissable ? -1 : null;
        if(a.id === SOLANA_SLIDE.id || b.id === SOLANA_SLIDE.id) return a.undismissable ? -1 : null;

       // The rest of the sort logic remains unchanged...
      });

     // The rest of the component remains unchanged...
});
