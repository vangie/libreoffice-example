import io, os
from shutil import copy2
import oss2

default_args = ["--headless", "--invisible", "--nodefault", "--view", "--nolockcheck", "--nologo", "--norestore"]

def handler(event, context):
    copy2('/code/example.docx', '/tmp/example.docx')
    os.chdir('/tmp')
    os.system("/mnt/auto/instdir/program/soffice %s --convert-to pdf --outdir /tmp /tmp/example.docx" % (' '.join(default_args)))
    return uploadToOss(context.region, context.credentials)

def uploadToOss(region, credentials):
    oss_endpoint = "http://oss-%s.aliyuncs.com" % (os.environ['OSS_REGION'] or region)
    bucket_name = ''
    if credentials.security_token:
        auth = oss2.StsAuth(credentials.access_key_id, credentials.access_key_secret, credentials.security_token)
    else:
        auth = oss2.Auth(credentials.access_key_id, credentials.access_key_secret)
    bucket = oss2.Bucket(auth, oss_endpoint, os.environ['OSS_BUCKET'])
    result = bucket.put_object_from_file('example.pdf','/tmp/example.pdf')
    if result.status == 200:
        return "upload to oss success, the url is %s" % bucket.sign_url('GET', 'example.pdf', 600)
    else:
        return "upload fail, error code %s " % result.status