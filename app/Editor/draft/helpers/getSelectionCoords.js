import { getVisibleSelectionRect } from 'draft-js';

export default function (editor) {
  const editorBounds = editor.getBoundingClientRect();
  const rangeBounds = getVisibleSelectionRect(window);

  if (!rangeBounds) return null;

  const rangeWidth = rangeBounds.right - rangeBounds.left;

  // const rangeHeight = rangeBounds.bottom - rangeBounds.top;
  return {
    left: (rangeBounds.left - editorBounds.left) + (rangeWidth / 2),
    bottom: editorBounds.bottom - rangeBounds.bottom + rangeBounds.height
  };
}
