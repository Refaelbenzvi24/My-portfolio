import { ATagButton, Row, theme, Typography } from "../UI"


const Credit = () => {
	const { t } = useTranslation()

	return (
		<Row className="mt-0 pt-0 pb-4 justify-center">
			<ATagButton href={'https://github.com/Refaelbenzvi24/My-portfolio'} text colorsForStates={theme.colorSchemeByState.primary}>
				<Typography variant={'small'}>
					{t('credit')}
				</Typography>
			</ATagButton>
		</Row>
	)
}

export default Credit
