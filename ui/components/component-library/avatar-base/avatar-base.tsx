import React from "react";
import classnames from "classnames";

import {
  BackgroundColor,
  TextColor,
  Display,
  JustifyContent,
  AlignItems,
  BorderRadius,
  TextVariant,
} from "../../../helpers/constants/design-system";

import type { PolymorphicRef } from "../box";
import { Text } from "../text";
import type { TextProps } from "../text";
import {
  AvatarBaseComponent,
  AvatarBaseProps as PropsType, // Rename to avoid shadowing
} from "./avatar-base.types";

const fallbackTextVariants = {
  [AvatarBaseSize.Lg]: TextVariant.bodyLgMedium,
};

const defaultValues = {
    size: AvatarBaseSize.Md, 
    backgroundColor: BackgroundColor.backgroundAlternative, 
    color: TextColor.textDefault, 
};

export const AvatarBase: AvatarBaseComponent =
React.forwardRef((props, ref) => {

    const { size = defaultValues.size, children, backgroundColor = defaultValues.backgroundColor , color = defaultValues.color , className='', ...restProps} : PropsType= props;
    
   const variant=fallbackTextVariants[size] || (size===AvatarBaseSize.Sm||size===AvatarBaseSize.Md?TextVariant.bodySm:TextVariant.bodyXs);

   return (
     <Text
       className={classnames("mm-avatar-base", `mm-avatar-base--size-${size}`, className)}
       ref={ref}
       as="div"
       display={Display.Flex}
       justifyContent={JustifyContent.center}
       alignItems={AlignItems.center}
       borderRadius={BorderRadius.full}
       variant={variant}
       textTransform={TextTransform.Uppercase}
        {...{backgroundColor,color}}
        {...restProps}>
         {children}
     </Text>
   );
});
