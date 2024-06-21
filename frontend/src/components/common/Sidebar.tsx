import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { routes } from '../../routes';

const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  // these link styles override the default truncation behavior
  link: {
    whiteSpace: 'normal',
    lineHeight: 'inherit',
  },
};

const SideBar: React.FunctionComponent = () => {
  // Map our routes to INavLinkGroup from fluent ui
  const navLinkGroups:INavLinkGroup[] = routes[0]?.children?.map((item)=>{
    return {
      links: [
        {
          name:item.id,
          url:item.path,
          key:item.id,
          isExpanded: !!item.children?.length,
          target: "_top",
          expandAriaLabel: item.id,
          links: item.children?.filter(
            (route) =>
              !["create", "edit", "detail"].some((exclude) =>
                route.path?.includes(exclude)
              )
          ).map((subItem)=>{
            return {
              name:subItem.id,
              url: subItem.index ? subItem.path : `${item.path}/${subItem.path}`,
              key:subItem.id,
              target: "_top"
            }
          })
        }
      ]
    }
  }) as INavLinkGroup[];

  return (
    <div className='flex flex-col border h-screen sticky top-0'>
      <h1 className='text-center font-bold p-6'>My Task</h1>
      <Nav selectedKey="key6" ariaLabel="Nav example with wrapped link text" styles={navStyles} groups={navLinkGroups} />
    </div>
  );
};

export default SideBar;
