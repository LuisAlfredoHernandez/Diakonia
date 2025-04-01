import { computed, nextTick, ref, watch } from "vue";
import type { Ref } from "vue";
import classNames from "classnames";

export type DropdownPlacement = "top" | "bottom" | "left" | "right";

export type UseDropdownClassesProps = {
  contentRef: Ref<HTMLDivElement | undefined>;
  visible: Ref<boolean>;
};

const defaultDropdownClasses = "absolute top-1/2 left-1/2 transform -translate-x-1/2";

const defaultGapInPx = 40;

export function useDropdownClasses(props: UseDropdownClassesProps): {
  contentClasses: Ref<string>;
  contentStyles: Ref<string>;
} {
  watch(props.visible, (value: boolean) => {
    if (value) nextTick(() => calculatePlacementClasses());
  });

  const placementStyles = ref("");

  const calculatePlacementClasses = () => {
    const boundingRect = props.contentRef.value?.getBoundingClientRect();
    console.log(boundingRect);
    if (!boundingRect) return (placementStyles.value = "");
    placementStyles.value = `top: ${
      boundingRect.top + defaultGapInPx
    }px;`;
  };

  const contentClasses = computed(() => {
    return classNames(defaultDropdownClasses);
  });

  return {
    contentClasses,
    contentStyles: placementStyles,
  };
}
