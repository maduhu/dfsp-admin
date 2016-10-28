import {Component, PropTypes, Children} from 'react';
import implementationStyle from './browser/style.css';
import {getLink} from 'ut-front/react/routerHelper';
import {mainRoute} from 'ut-rule/ui/react';

export default class Provider extends Component {
    getChildContext() {
        return {
            implementationStyle: implementationStyle,
            mainUrl: getLink(mainRoute),
            mainTabset: [{
                routeName: 'ut-rule:home',
                title: 'Rules',
                props: {
                    activeClassName: 'active'
                }
            }],
            initialLoginFields: {
                title: 'Connect with password',
                inputs: {
                    username: true,
                    password: true
                }
            }
        };
    }
    render() {
        let { children } = this.props;
        return Children.only(children);
    }
}

Provider.childContextTypes = {
    implementationStyle: PropTypes.object,
    mainUrl: PropTypes.string,
    mainTabset: PropTypes.array,
    initialLoginFields: PropTypes.object
};

Provider.propTypes = {
    children: PropTypes.node
};
