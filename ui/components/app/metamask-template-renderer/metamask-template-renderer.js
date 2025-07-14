import React, { memo } from 'react';
import { isEqual } from 'lodash';
import { safeComponentList } from './safe-component-list';
import { ValidChildren } from './section-shape';

function getElement(section) {
  const { element } = section;
  const Element = safeComponentList[element];
  if (!Element) {
    throw new Error(
      `${element} is not in the safe component list for wukocApp template renderer`,
    );
  }
  return Element;
}

function renderElement(element) {
  const Element = getElement(element);
  const propsAsComponents = element.propComponents
    ? getPropComponents(element.propComponents)
    : {};
  return (
    <Element {...element.props} {...propsAsComponents}>
      {typeof element.children === 'object' ? (
        <wukocAppTemplateRenderer sections={element.children} />
      ) : (
        element?.children
      )}
    </Element>
  );
}

function getPropComponents(components) {
  return Object.entries(components).reduce((acc, [key, component]) => {
    acc[key] = Array.isArray(component)
      ? component.map(renderElement)
      : renderElement(component);
    return acc;
  }, {});
}

const wukocAppTemplateRenderer = memo(({ sections }) => {
  if (!sections) return null;
  if (typeof sections === 'string') return sections;

  if (
    typeof sections === 'object' &&
    !Array.isArray(sections) &&
    !sections.hide
  ) {
    return renderElement(sections);
  }

  return (
    <>
      {sections
        .filter(section => !section.hide)
        .map((child, index) => {
          if (typeof child === 'string') {
            return child;
          }
          if (!child.key) {
            throw new Error(
              'When using array syntax in wukocApp Template Language, you must specify a key for each child of the array',
            );
          }
          if (typeof child.children === 'object') {
            return (
              <wukocAppTemplateRenderer key={child.key} sections={child} />
            );
          }
          const Element = getElement(child);
          const propsAsComponents = child.propComponents
            ? getPropComponents(child.propComponents)
            : {};
          return (
            <Element
              key={child.key}
              {...child.props}
              {...propsAsComponents}
            >
              {child.children}
            </Element>
          );
        })}
    </>
  );
}, isEqual);

wukocAppTemplateRenderer.propTypes = {
  sections: ValidChildren,
};

export default wukocAppTemplateRenderer;
