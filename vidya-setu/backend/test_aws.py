import boto3, json
from dotenv import dotenv_values

config = dotenv_values('.env')
KEY = config.get('AWS_ACCESS_KEY_ID')
SECRET = config.get('AWS_SECRET_ACCESS_KEY')
REGION = config.get('AWS_REGION', 'us-east-1')

print(f'Checking Key ID: {KEY}')

print('\nStep 1: Checking STS Identity...')
try:
    sts = boto3.client('sts', region_name=REGION, aws_access_key_id=KEY, aws_secret_access_key=SECRET)
    identity = sts.get_caller_identity()
    print('PASS - Account:', identity['Account'])
    print('PASS - User:', identity['Arn'])
except Exception as e:
    print('FAIL STS:', e)
    exit(1)

print('\nStep 2: Calling Claude 3.5 Sonnet on Bedrock...')
try:
    client = boto3.client('bedrock-runtime', region_name=REGION, aws_access_key_id=KEY, aws_secret_access_key=SECRET)
    body = json.dumps({
        'anthropic_version': 'bedrock-2023-05-31',
        'max_tokens': 50,
        'messages': [{'role': 'user', 'content': 'Say exactly: Vidya-Setu AI is successfully activated!'}]
    })
    resp = client.invoke_model(modelId='anthropic.claude-3-5-sonnet-20240620-v1:0', body=body, contentType='application/json', accept='application/json')
    result = json.loads(resp['body'].read())
    print('PASS - Claude says:', result['content'][0]['text'])
except Exception as e:
    print('FAIL BEDROCK:', e)
