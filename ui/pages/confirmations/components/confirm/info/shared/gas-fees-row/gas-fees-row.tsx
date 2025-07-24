import { TransactionMeta } from '@wukocapp/transaction-controller';
import React from 'react';
import { useSelector } from 'react-redux';
import { TEST_CHAINS } from '../../../../../../../../shared/constants/network';
import {
  ConfirmInfoRow,
  ConfirmInfoRowVariant,
} from '../../../../../../../components/app/confirm/info/row';
import { Box, Text } from '../../../../../../../components/component-library';
import Tooltip from '../../../../../../../components/ui/tooltip';
import {
  AlignItems,
  Display,
  FlexDirection,
  JustifyContent,
  TextAlign,
  TextColor,
} from '../../../../../../../helpers/constants/design-system';
import { getPreferences } from '../../../../../../../selectors';
import { useConfirmContext } from '../../../../../context/confirm';

export const GasFeesRow = ({
  label, tooltipText, fiatFee, fiatFeeWith18SignificantDigits, nativeFee, 'data-testid': dataTestId
}) => {
  
    const isTestnet = !!useSelector(getPreferences)?.showFiatInTestnets && TEST_CHAINS.includes(useConfirmContext<TransactionMeta>().currentConfirmation?.chainId);

    return (
        <ConfirmInfoRow 
            data-testid={dataTestId}
            label={label}
            tooltip={tooltipText}
            variant={ConfirmInfoRowVariant.Default}
        >
            <Box
                display={Display.Flex}
                flexDirection={FlexDirection.Row}
                justifyContent={JustifyContent.spaceBetween}
                alignItems={AlignItems.center}
                textAlign={TextAlign.Center}
                marginLeft={8}>
                    <Text marginRight={1} color={TextColor.textDefault}>{nativeFee}</Text>
                    {(isTestnet || !fiatFeeWith18SignificantDigits) ? (
                        <Text color={TextColor.textAlternative}>{fiatFee}</Text>
                    ) : (
                        <Tooltip title={(fiatFeeWith18SignificantDigits)}>
                            <Text color={(TextColor.textAlternative)}>{fiatFee}</Text>
                        </Tooltip>
                    )}
             </Box>
        </ConfirmInfoRow>
    );
};
