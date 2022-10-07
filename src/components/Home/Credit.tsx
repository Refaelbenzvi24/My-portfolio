import { ATagButton, Row, theme, Typography } from "../UI"


const Credit = () => {
	const { t } = useTranslation()

	return (
		<Row className="mt-0 pt-0 pb-5 justify-center">
			<ATagButton href="https://github.com/Refaelbenzvi24/My-portfolio"
			            text
			            colorsForStates={theme.colorSchemeByState.primary}>
				<Row className="flex-wrap justify-center">
					<IconEvaGithubOutline/>
					<Typography variant="small">
						{t('credit.main')}
					</Typography>
					&nbsp;
					<Typography variant="small">
						{t('credit.name')}
					</Typography>
				</Row>
			</ATagButton>
		</Row>
	)
}

export default Credit
