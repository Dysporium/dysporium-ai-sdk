import { useState, useEffect } from 'react'
import { PanelLeftClose, PanelRightClose, Plus } from 'lucide-react'
import type { ReactNode } from 'react'

const PanelLeftCloseIcon = PanelLeftClose as React.ComponentType<{ size?: number; className?: string }>
const PanelRightCloseIcon = PanelRightClose as React.ComponentType<{ size?: number; className?: string }>
const PlusIcon = Plus as React.ComponentType<{ size?: number; className?: string }>

interface SidebarProps {
  isOpen: boolean
  onNewChat: () => void
  hasMessages: boolean
  children?: ReactNode
}

const SIDEBAR_COLLAPSED_KEY = 'dysporium-sidebar-collapsed'

export function Sidebar({ isOpen, onNewChat, hasMessages, children }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(isCollapsed))
  }, [isCollapsed])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:static ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-secondary border-r border-secondary flex flex-col transition-all duration-300 z-50`}
    >
      <div className={`p-3 border-b border-secondary ${isCollapsed ? 'flex flex-col items-center gap-2' : 'flex items-center gap-2'}`}>
        <button
          onClick={onNewChat}
          className={`flex items-center ${
            isCollapsed ? 'justify-center w-10 h-10' : 'gap-3 w-full'
          } px-3 py-2 bg-transparent rounded-2xl text-primary text-sm transition-colors`}
          title={isCollapsed ? 'New chat' : undefined}
        >
          <PlusIcon size={16} className="flex-shrink-0" />
          {!isCollapsed && <span>New chat</span>}
        </button>
        <button
          onClick={toggleCollapse}
          className="hidden md:flex items-center justify-center w-8 h-8 bg-transparent border-none text-primary hover:bg-secondary hover:text-primary rounded-lg transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <PanelRightCloseIcon size={16} />
          ) : (
            <PanelLeftCloseIcon size={16} />
          )}
        </button>
      </div>
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-2">
          <div>
            <h3 className="text-xs font-semibold text-primary uppercase px-3 py-2 mb-2">
              Recent
            </h3>
            <div className="flex flex-col gap-1">
              {hasMessages && (
                <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-secondary hover:text-primary transition-colors text-sm text-primary truncate">
                  Today's conversation
                </div>
              )}
            </div>
          </div>
          {children}
        </div>
      )}
    </aside>
  )
}

