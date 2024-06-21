import {
  FontWeights,
  IButtonStyles,
  IIconProps,
  IconButton,
  Modal,
  PrimaryButton,
  getTheme,
  mergeStyleSets,
} from "@fluentui/react"
import React, {useCallback} from "react"

interface IConfirmDeleteModalProps {
  onHideModal: () => void
  id: number
  isOpen?: boolean
  title?: string
  message?:string
  onConfirm: (id: number) => void
}
const ConfirmDeleteModal: React.FC<IConfirmDeleteModalProps> = ({
  onHideModal,
  id,
  isOpen,
  title,
  onConfirm,
  message
}) => {
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      onConfirm(id)
    },
    [onConfirm, id],
  )

  return (
    <Modal
      titleAriaId="modalDelete"
      isOpen={isOpen}
      onDismiss={onHideModal}
      isBlocking={false}
      containerClassName={contentStyles.container}
    >
      <div className={contentStyles.header}>
        <h2 className={contentStyles.heading}>{title}</h2>
        <IconButton
          styles={iconButtonStyles}
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={onHideModal}
        />
      </div>
      <form onSubmit={handleSubmit} className={`flex flex-col gap-4 px-6 items-center mt-auto h-full`}>
        <p>
            {message}
        </p>
        <div className="flex gap-2 mt-auto">
          <PrimaryButton onClick={onHideModal} type="button" text="Cancel" />
          <PrimaryButton type="submit" text="Yes" />
        </div>
      </form>
    </Modal>
  )
}

export default ConfirmDeleteModal

const cancelIcon: IIconProps = {iconName: "Cancel"}

const theme = getTheme()
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  heading: {
    color: theme.palette.neutralPrimary,
    fontWeight: FontWeights.semibold,
    fontSize: "inherit",
    margin: "0",
  },
})

const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
}
