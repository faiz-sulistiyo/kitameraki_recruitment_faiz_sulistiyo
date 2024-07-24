import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
} from "@fluentui/react-components"
import React, {ReactElement, useCallback} from "react"

interface IConfirmDeleteModalProps {
  id: number
  title?: string
  message?: string
  onConfirm: (id: number) => void
  triggerButton: ReactElement
}

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
})

const ConfirmDeleteModal: React.FC<IConfirmDeleteModalProps> = ({
  id,
  title,
  onConfirm,
  message,
  triggerButton,
}) => {
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      onConfirm(id)
    },
    [onConfirm, id],
  )
  const styles = useStyles()

  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger disableButtonEnhancement action="open">{triggerButton}</DialogTrigger>
      <DialogSurface>
        <DialogBody className="!block">
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 px-6 items-center w-full mt-auto h-full`}
          >
            <DialogTitle>
              <div>
                <h2>{title}</h2>
              </div>
            </DialogTitle>
            <DialogContent className={styles.content}>{message}</DialogContent>
            <DialogActions className="self-end">
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <DialogTrigger disableButtonEnhancement>
                <Button type="submit" appearance="primary">
                  Submit
                </Button>
              </DialogTrigger>
            </DialogActions>
          </form>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default ConfirmDeleteModal
