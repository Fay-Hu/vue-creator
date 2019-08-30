import './loading.less'
import color from 'muse-ui/lib/internal/mixins/color'
import { CubeShadow } from 'vue-loading-spinner'

export default {
  mixins: [color],
  name: 'mu-loading',
  components: {
    CubeShadow
  },
  props: {
    size: Number,
    overlayColor: String,
    text: String,
    fixed: Boolean,
    className: String
  },
  data () {
    return {
      show: false
    }
  },
  render (h) {
    return h('mu-fade-transition', [
      h('div', {
        staticClass: 'mu-loading-wrap',
        class: {
          [this.className || '']: true,
          'mu-loading-wrap__fixed': this.fixed
        },
        style: {
          'background-color': this.overlayColor
        },
        directives: [{
          name: 'show',
          value: this.show
        }]
      }, [
        h('CubeShadow', {
          staticClass: 'mu-loading-circular',
          style: {
            width: this.size + 'px',
            height: this.size + 'px'
          },
          props: {
            size: this.size,
            color: this.color,
            strokeWidth: 2
          }
        }),
        this.text ? h('span', {
          staticClass: `mu-loading-text ${this.getNormalColorClass(this.color, true)}`,
          style: {
            color: this.color
          }
        }, this.text) : undefined
      ])
    ])
  }
}
