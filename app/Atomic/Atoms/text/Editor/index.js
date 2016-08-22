import onClickOutside from 'Editor/helpers/onClickOutside';
import Draft from 'Editor/draft';

export default onClickOutside(props => props.deactivate())(Draft);
