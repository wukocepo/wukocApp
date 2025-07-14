import { connect } from 'react-redux';
import AccountsList from './accounts-list.component';

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps)(AccountsList);
