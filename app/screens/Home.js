import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { connectAlert } from '../components/Alert';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    isFetching: PropTypes.bool,
    conversionRate: PropTypes.number,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
  };

  componentDidMount() {
    this.props.dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      this.props.alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  };

  handlePressBaseCurrency = () => {
    console.log('press base');
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  };

  handlePressQuoteCurrency = () => {
    console.log('press quote');
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    console.log('handle options press');
    this.props.navigation.navigate('Options');
  };

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...';
    }

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            value={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={this.props.lastConvertedDate}
            conversionRate={this.props.conversionRate}
          />
          <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency} />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { baseCurrency, quoteCurrency, amount } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const lastConvertedDate = conversionSelector.date
    ? new Date(conversionSelector.date)
    : new Date();

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate,
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
