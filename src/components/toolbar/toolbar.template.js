function toButton(button) {
  const json = JSON.stringify(button.value)
  const meta = `
    data-type="button"
    data-value='${json}'
  `
  return `
    <div
      class="button  ${button.active ? 'active' : ''}"
      ${meta}
    >
      <i
        class="material-icons"
        ${meta}
      >
        ${button.icon}
      </i>
    </div>
  `
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underline',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
    {
      icon: 'border_bottom',
      active: state['borderBottom'] === '2px solid rgb(0, 0, 0)',
      value: {
        borderBottom:
          state['borderBottom'] === '2px solid rgb(0, 0, 0)'
            ? '1px solid rgb(226, 227, 227)'
            : '2px solid rgb(0, 0, 0)',
      },
    },
    {
      icon: 'border_right',
      active: state['borderRight'] === '2px solid rgb(0, 0, 0)',
      value: {
        borderRight:
          state['borderRight'] === '2px solid rgb(0, 0, 0)'
            ? '1px solid rgb(226, 227, 227)'
            : '2px solid rgb(0, 0, 0)',
      },
    },
  ]
  return buttons.map(toButton).join('')
}
