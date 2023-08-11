<script>
import { fieldProps, formUtils } from '@lljj/vue-json-schema-form'
import {
    getPathVal, setPathVal
} from '@lljj/vjsf-utils/vueUtils';

export default {
    props: {
        ...fieldProps,
    },
    computed: {
        value: {
            get() {
                return getPathVal(this.rootFormData, this.curNodePath);
            },
            set(v) {
                setPathVal(this.rootFormData, this.curNodePath, v);
            }
        },
        options() {
            return formUtils.getUiOptions({
                schema: this.schema
            })
        },
    },
}
</script>