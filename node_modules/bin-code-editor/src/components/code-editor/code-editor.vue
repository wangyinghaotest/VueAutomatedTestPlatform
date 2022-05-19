<template>
  <div class="bin-json-editor" :style="style">
    <label>
      <textarea ref="textarea"/>
    </label>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror-formatting'
  import 'codemirror/addon/fold/foldcode'
  import 'codemirror/addon/fold/foldgutter'
  import 'codemirror/addon/fold/brace-fold'
  import 'codemirror/addon/fold/comment-fold'
  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/json-lint'
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require('script-loader!jsonlint')

  export default {
    name: 'BCodeEditor',
    props: {
      value: {
        type: String
      },
      showNumber: {
        type: Boolean,
        default: true
      },
      mode: {
        type: String,
        default: 'application/json'
      },
      theme: {
        type: String,
        default: 'idea'
      },
      lint: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      indentUnit: {
        type: Number,
        default: 2
      },
      smartIndent: {
        type: Boolean,
        default: true
      },
      lineWrap: {
        type: Boolean,
        default: true
      },
      gutter: {
        type: Boolean,
        default: true
      },
      autoFormat: { // 进入时是否自动格式化
        type: Boolean,
        default: true
      },
      height: {
        type: String
      }
    },
    data() {
      return {
        jsonEditor: false
      }
    },
    computed: {
      style() {
        return {
          height: this.height ? this.height : '300px'
        }
      }
    },
    watch: {
      value(value) {
        const editorValue = this.jsonEditor.getValue()
        if (value !== editorValue) {
          this.jsonEditor.setValue(value)
          // 触发校验
          this.dispatch('BFormItem', 'on-form-change', value)
        }
      },
      showNumber(val) {
        this.jsonEditor && this.jsonEditor.setOption('lineNumbers', val)
      },
      lint(val) {
        this.jsonEditor && this.jsonEditor.setOption('lint', val)
      },
      readonly(val) {
        this.jsonEditor && this.jsonEditor.setOption('readOnly', val)
      },
      theme(val) {
        this.jsonEditor && this.jsonEditor.setOption('theme', val)
      }
    },
    mounted() {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: this.showNumber,
        mode: this.mode,
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        theme: this.theme,
        lint: this.lint,
        readOnly: this.readonly,
        indentUnit: this.indentUnit, // 缩进单位，默认2
        smartIndent: this.smartIndent,
        lineWrapping: this.lineWrap, // 代码换行
        foldGutter: this.gutter,
        autoRefresh: true, // 自动触发刷新
        // 快捷键
        extraKeys: {
          'F7': function autoFormat(cm) {
            let totalLines = cm.lineCount()
            cm.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines })
          } // 代码格式化
        }
      })
      this.jsonEditor.setValue(this.value)
      if (this.autoFormat && this.value && this.value.length > 0) {
        try {
          const formatStr = JSON.stringify(JSON.parse(this.value), null, this.indentUnit)
          this.$emit('on-change', formatStr)
          this.$emit('input', formatStr)
        } catch (e) {
          this.formatCode()
        }
      }
      this.jsonEditor.on('change', cm => {
        this.$emit('on-change', cm.getValue())
        this.$emit('input', cm.getValue())
      })
      this.jsonEditor.on('blur', this.handleBlur)
      this.$emit('on-init', this.jsonEditor)
    },
    methods: {
      getEditor() {
        return this.jsonEditor
      },
      getValue() {
        return this.jsonEditor.getValue()
      },
      formatCode() {
        if (this.jsonEditor) {
          let totalLines = this.jsonEditor.lineCount()
          this.jsonEditor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines })
        }
      },
      handleBlur(event) {
        this.$emit('on-blur', event)
        // 触发校验
        this.dispatch('BFormItem', 'on-form-blur', this.value)
      },
      refresh() {
        this.jsonEditor && this.jsonEditor.refresh()
      },
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root
        let name = parent.$options.name

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent

          if (parent) {
            name = parent.$options.name
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params))
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~codemirror/addon/lint/lint.css";
  @import '~codemirror/lib/codemirror.css';
  @import "~codemirror/addon/fold/foldgutter.css";
  @import '~codemirror/theme/idea.css';
  @import '~codemirror/theme/eclipse.css';
  @import '~codemirror/theme/rubyblue.css';
  @import '~codemirror/theme/duotone-light.css';
  @import '~codemirror/theme/monokai.css';
  @import '~codemirror/theme/mdn-like.css';
  @import '~codemirror/theme/xq-light.css';
  @import '~codemirror/theme/dracula.css';
  @import '~codemirror/theme/material.css';
  @import '~codemirror/theme/material-darker.css';
</style>
