// 这是按需引入element-ui，注意用 npm i.
import {
    Button,
    Input,
    Select,
    Card,
    Option,
    Icon,
    DatePicker,
    Divider,
    Collapse,
    CollapseItem,
} from 'element-ui';

const components = [
    Button,
    Input,
    Select,
    Card,
    Option,
    Icon,
    DatePicker,
    Divider,
    Collapse,
    CollapseItem,
];
export function setupElementUI(app) {
    for (const component of components) {
        app.component(component.name, component)
    }
}
