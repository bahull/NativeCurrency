import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import Proptypes from 'prop-types';

import styles from './styles';

const LastConverted = ({
  base, quote, date, conversionRate,
}) => (
  <Text style={styles.smallText}>
    1
    {' '}
    {base}
    {' '}
=
    {' '}
    {conversionRate}
    {' '}
    {quote}
    {' '}
as of
    {' '}
    {moment(date).format('MMMM D, YYYY')}
  </Text>
);

LastConverted.propTypes = {
  date: Proptypes.object,
  base: Proptypes.string,
  quote: Proptypes.string,
  conversionRate: Proptypes.number,
};
export default LastConverted;
